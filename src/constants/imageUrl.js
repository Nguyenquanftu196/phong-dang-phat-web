const PATH_S3_BUCKET = process.env.REACT_APP_PATH_S3_BUCKET;

export const teamLogoUrl = (teamId) => {
  return `${PATH_S3_BUCKET}/upload/team/logo/large/${teamId}.png`
}

export const teamLogoSmallUrl = (teamId) => {
  return `${PATH_S3_BUCKET}/upload/team/logo/small/${teamId}.png`
}

export const nationLogoUrl = (nation) => {
  return `${PATH_S3_BUCKET}/upload/nation/flag/small/${nation}`
}

export const playerAvatarUrl = (playerId) => {
  return `${PATH_S3_BUCKET}/upload/player/avatar/${playerId}.png`
}

export const defaultAvatar = () => {
  return `${PATH_S3_BUCKET}/upload/player/avatar/default.png`
}

export const miniField = () => {
  return `${PATH_S3_BUCKET}/upload/team/logo/mini-field.png`
}

export const trophyUrl = (id) => {
  return `${PATH_S3_BUCKET}/upload/title/image/large/${id}.png`
}

export const tournamentUrl = (name) => {
  return `${PATH_S3_BUCKET}/upload/tournament/logo/large/${name}.png`
}
