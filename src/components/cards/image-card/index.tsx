import * as React from 'react';
import './index.scss';

export interface imageCardProps {
    imageUrl: string,
    imageAlt: string,
    title: string,
    description: string
}
 
const imageCard: React.SFC<imageCardProps> = (props) => {
    return ( <div className="card">
        <div className="image-overlay"/>
        <img src={props.imageUrl} alt={props.imageAlt}/>
        <h3 className="title">{props.title}</h3>
        <span className="description">{props.description}</span>
    </div> );
}
 
export default imageCard;