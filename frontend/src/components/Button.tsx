import React from 'react'

// interface IButton {
//     title: string;
//     to?: string;
//     // isSubmit?: "button" | "submit" | "reset" | undefined;
//     className?: string;
// }

interface IButton {
    title: string;
    onClick?: () => void;
    type?: string;
    className?: string;
}

const Button: React.FC<IButton> = (props) => {

     return props.type ? 
         (
            <button type="submit" onClick={props.onClick}
                className={`[border-0 p-4 bg-pink-800 text-slate-200
                hover:bg-purple-600 hover:text-slate-100 transition-all
                 duration-500 rounded-md, ${props.className && props.className}]`}>
                {props.title}
            </button>
        ): (
        <button onClick={props.onClick}
            className={`[border-0 p-4 bg-pink-700 text-slate-200
            hover:bg-purple-600 hover:text-slate-100 transition-all rounded-full
             duration-500 rounded-md, ${props.className && props.className}]`}>
            {props.title}
        </button>
    );

    // return (
    //     <button
    //         className={`[border-0 p-4 bg-slate-300 text-slate-500
    //        hover:bg-blue-600 hover:text-slate-100 transition-all
    //         duration-500 rounded-md, ${props.className && props.className}]`}
    //     >

    //         {props.title}</button>
    // );
}

export default Button;