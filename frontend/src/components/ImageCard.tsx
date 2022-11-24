import React from 'react';

interface IImageCard {
    title: string;
    textPreview: string;
    img: string;
}

const ImageCard: React.FC<IImageCard> = (props) => {

    return (
        <div className="w-full">
            <img src={props.img} width="100%" className={`border-1 object-cover object-center`} />
            <div>
                <p className=" font-semibold">{props.title}</p>
                {props.textPreview}
            </div>
        </div>
    )
}

export default ImageCard;