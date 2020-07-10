import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withStyles, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@material-ui/core';
import { styles } from './ModalCreateProduct.style'
import { map, remove, isEmpty, filter } from 'lodash'
import Dropzone from "react-dropzone";
import BackupIcon from '@material-ui/icons/Backup';
import Slide from '@material-ui/core/Slide'
import { Category } from '../../../../models/category'
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '../../../Alert'
import { UploadImage } from '../../../../models/uploadImage'
import { Product } from '../../../../models/product';
import { LoadingComponent } from '../../../Loading'
import { productUrl } from '../../../../constants/imageUrl'
import ReactQuill from 'react-quill';
import '../../../../../node_modules/react-quill/dist/quill.snow.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const ModalCreateProduct = withTranslation()(withStyles(styles)(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleVN: '',
      titleEN: '',
      price: 0,
      priceAfterDiscount: 0,
      category: 0,
      brand: '',
      unit: '',
      quantity: 0,
      descriptionVN: '',
      descriptionEN: '',
      imageSelected: [],
      categories: [],
      error: {
        open: false,
        message: '',
        security: ''
      },
      isLoading: false
    };
  }

  onDropFiles = (acceptedFiles) => {
    const reader = new FileReader()
    let that = this
    let { imageSelected } = this.state
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      acceptedFiles[0]['preview'] = reader.result
      imageSelected.push(acceptedFiles[0])
      that.setState({ imageSelected })
    }, false);
    reader.readAsDataURL(acceptedFiles[0])
    // this.setState({ imageSelected: acceptedFiles[0] });
  }

  getListCategory = async () => {
    const result = await Category.list(null, 0)
    this.setState({ categories: result.rows })
  }

  deleteImage = (index) => {
    let { imageSelected } = this.state
    remove(imageSelected, (o, i) => i === index);
    this.setState({ imageSelected });
  }

  async componentDidMount(){
    await this.getListCategory()
  }

  onCloseAlert = () => {
    this.setState({ error: { open: false, message: '', security: '' } })
  }

  validProduct = () => {
    const { titleVN, titleEN, price, priceAfterDiscount, category, brand, unit, quantity, descriptionEN, descriptionVN, error } = this.state
    this.setState({ error: { open: false, message: '', security: '' } })
    console.log('valid: ', price, priceAfterDiscount, priceAfterDiscount > price, typeof(price), typeof(priceAfterDiscount));
    if (titleVN.trim() === '') {
      this.setState({ error: { open: true, message:'Invalid Title(VN)', security: 'error' } })
      return false
    } else if (titleEN.trim() === '') {
      this.setState({ error: { open: true, message:'Invalid Title(EN)', security: 'error' } })
      return false
    } else if (parseInt(price) < 1) {
      this.setState({ error: { open: true, message:'Price must bigger than 0', security: 'error' } })
      return false
    } else if (parseInt(priceAfterDiscount) > parseInt(price)) {
      this.setState({ error: { open: true, message:'Price must bigger than priceAfterDiscount', security: 'error' } })
      return false
    } else if (category < 1) {
      this.setState({ error: { open: true, message:'Invalid category', security: 'error' } })
      return false
    } else if (brand.trim() === '') {
      this.setState({ error: { open: true, message:'Invalid brand', security: 'error' } })
      return false
    } else if (unit.trim() === '') {
      this.setState({ error: { open: true, message:'Invalid unit', security: 'error' } })
      return false
    } else if (parseInt(quantity) < 1) {
      this.setState({ error: { open: true, message:'Quantity must bigger than 0', security: 'error' } })
      return false
    } else if (descriptionEN.trim() === '') {
      this.setState({ error: { open: true, message:'Invalid descriptionEN', security: 'error' } })
      return false
    } else if (descriptionVN.trim() === '') {
      this.setState({ error: { open: true, message:'Invalid descriptionVN', security: 'error' } })
      return false
    } else {
      return true
    }
  }

  onCreateProduct = async () => {
    const isValid = this.validProduct()
    const { imageSelected, titleVN, titleEN, price, priceAfterDiscount, category, brand, unit, quantity, descriptionEN, descriptionVN } = this.state
    if (!isValid) {
      return
    }
    this.setState({ isLoading: true })
    let picturesToUpload = filter(imageSelected, p => p.preview)
    let picturesUploaded = filter(imageSelected, p => !p.preview);
    let picturesToInsert = []
    if (imageSelected.length > 0) {
      picturesToInsert = await UploadImage.uploadImage(picturesToUpload)      
    }
    picturesToInsert = picturesToInsert.concat(picturesUploaded)

    const payload = {
      titleVN,
      titleEN,
      price: parseInt(price),
      priceAfterDiscount: parseInt(priceAfterDiscount),
      category,
      brand,
      unit,
      quantity: parseInt(quantity),
      descriptionEN,
      descriptionVN,
      pictures: picturesToInsert
    }

    let res = {}
    if (isEmpty(this.props.product)) {
      res = await Product.create(payload)
    } else {
      res = await Product.edit(payload, this.props.product.id)
    }
    const result = await res.json()
    if (result.id) {
      this.setState({ isLoading: false, error: { open: true, message: 'Create/Update product success!', security: 'success' } })
      this.props.onClose()
      this.props.getListProduct()
    } else {
      this.setState({ isLoading: false, error: { open: true, message: 'Create product fail!', security: 'error' } })
    }
  }

  resetProduct = () => {
    this.setState({
      titleVN: '',
      titleEN: '',
      price: 0,
      priceAfterDiscount: 0,
      category: 0,
      brand: '',
      unit: '',
      quantity: 0,
      descriptionVN: '',
      descriptionEN: '',
      imageSelected: [],
    })
  }

  componentWillReceiveProps(nextProps){
    if(!isEmpty(nextProps.product)){
      this.setState({
        titleVN: nextProps.product.titleVN,
        titleEN: nextProps.product.titleEN,
        price: nextProps.product.price,
        priceAfterDiscount: nextProps.product.priceAfterDiscount,
        category: nextProps.product.category,
        brand: nextProps.product.brand,
        unit: nextProps.product.unit,
        quantity: nextProps.product.quantity,
        descriptionVN: nextProps.product.descriptionVN,
        descriptionEN: nextProps.product.descriptionEN,
        imageSelected: JSON.parse(nextProps.product.pictures)
      })
    } else {
      this.resetProduct()
    }
  }

  render() {
    const { classes, openModal } = this.props
    const { titleVN, titleEN, price, category, brand, unit, priceAfterDiscount, quantity, categories, imageSelected, descriptionVN, descriptionEN, error, isLoading } = this.state

    return (
      <div>
        <Alert {...error} onCloseAlert={this.onCloseAlert}/>
        <Dialog
          fullWidth
          maxWidth="md"
          open={openModal}
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onExit={this.exitDialog}
          classes={{ paper: classes.mainDialog }}
          TransitionComponent={Transition}
        >
          <LoadingComponent isLoading={isLoading}/>
          <DialogTitle id="form-dialog-title">Create New Product</DialogTitle>
          <DialogContent onClick={e => e.stopPropagation()} className={classes.dialogContent}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Title (VN)"
                  type="text"
                  onChange={e => { this.setState({ titleVN: e.target.value }) }}
                  value={titleVN}
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Title (EN)"
                  type="text"
                  onChange={e => { this.setState({ titleEN: e.target.value }) }}
                  value={titleEN}
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  onChange={e => { this.setState({ price: e.target.value }) }}
                  value={price}
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price after discount"
                  type="number"
                  onChange={e => { this.setState({ priceAfterDiscount: e.target.value }) }}
                  value={priceAfterDiscount}
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-select-currency"
                  select
                  label="Category"
                  value={category}
                  onChange={e => { this.setState({ category: e.target.value }) }}
                  variant="outlined"
                >
                  {map(categories, option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.nameVN}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Brand"
                  type="text"
                  onChange={e => { this.setState({ brand: e.target.value }) }}
                  value={brand}
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Unit"
                  type="text"
                  onChange={e => { this.setState({ unit: e.target.value }) }}
                  value={unit}
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  onChange={e => { this.setState({ quantity: e.target.value }) }}
                  value={quantity}
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={6}>
                <label>Description (VN)</label>
                <ReactQuill value={descriptionVN} onChange={descriptionVN => this.setState({ descriptionVN })} className={classes.mainEditor}/>
              </Grid>
              <Grid item xs={6}>
                <label>Description (EN)</label>
                <ReactQuill value={descriptionEN} onChange={descriptionEN => this.setState({ descriptionEN })} className={classes.mainEditor}/>
              </Grid>
              <Grid item xs={12}>
                <Dropzone onDrop={this.onDropFiles} multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <div className={classes.mainUpoadFile} {...getRootProps()}>
                      <BackupIcon style={{ height: 80, width: 80, color: '#9e9e9e' }}/>
                      <input {...getInputProps()}/>
                    </div>
                  )}
                </Dropzone>
              </Grid>
              {
                imageSelected.length > 0 && map(imageSelected, (image, index) => {
                  let url = productUrl(image)
                  if (image.preview) {
                    url = image.preview
                  }
                  return (
                    <Grid item xs={3} className={classes.mainImgProduct}>
                      <CloseIcon className={classes.iconDelete} onClick={() => this.deleteImage(index)}/>
                      <img src={url} alt="" className={classes.imgProduct}/>
                    </Grid>
                  )
                })
              }
            </Grid>
          </DialogContent>
          <DialogActions classes={{ root: classes.dialogActionRoot }}>
            <Button onClick={this.props.onClose} color="primary">Cancel</Button>
            <Button onClick={() => this.onCreateProduct()} color="primary" autoFocus variant="contained">Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}))
