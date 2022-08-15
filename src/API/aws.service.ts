import { Fetcher } from '../helpers/Fetcher'

const { REACT_APP_UAM_URL:UAM_URL } = process.env;

export const getUploadSignedUrl: (contentType:string) => Promise<any> = (type) => {
    return Fetcher(`${UAM_URL}/create-signed-urls`,'POST',{ type })
}

export const getSignedUrl:(key:string) => Promise<any> = (key) => {
    return Fetcher(`${UAM_URL}/get-signed-urls`,'POST',{ key })
}
