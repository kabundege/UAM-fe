import { FC, ImgHTMLAttributes, useEffect, useRef, memo } from 'react'
import { getSignedUrl } from '../../API/aws.service'

export interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string,
    alt?: string,
}

const CustomeImage:FC<CustomImageProps> = ({ src, alt='', ...rest }) => {
    const ImgRef = useRef<HTMLImageElement|null>(null)

    useEffect(()=>{
        if(src){
            if( !src.startsWith('data:') && !src.startsWith('blob')){
                // reset the image that
                if(ImgRef.current && ImgRef.current.src)
                ImgRef.current.src = ""
                /**
                 * Private Images
                 */
                getSignedUrl(src)
                .then(res => {
                    const { url } = res.data as any
                    if(ImgRef.current)
                    ImgRef.current.src = url
                })
            }else if(ImgRef.current){
                // local files
                ImgRef.current.src = src
            }
        }
    },[src])

    return (
        <img {...rest} ref={ImgRef} alt={alt} />
    )
}

export default memo(CustomeImage)