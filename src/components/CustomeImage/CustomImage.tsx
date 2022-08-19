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
            /**
             * Private Images
             */
            getSignedUrl(src)
            .then(res => {
                const url = res.data as any
                if(ImgRef.current)
                ImgRef.current.src = url
            })
        }
    },[src])

    return (
        <img {...rest} ref={ImgRef} alt={alt} />
    )
}

export default memo(CustomeImage)