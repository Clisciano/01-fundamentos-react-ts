import styles from './Avatar.module.css';

interface AvatarProps {
    hasBorder?: boolean;
    src: string;
    alt?: string;
}

export function Avatar({hasBorder = true, src, alt}: AvatarProps) {
    return (
       <img 
            className={hasBorder ? styles.avatarWithBorder : styles.Avatar} 
            src={src}
            alt={alt}
       />
    )
}