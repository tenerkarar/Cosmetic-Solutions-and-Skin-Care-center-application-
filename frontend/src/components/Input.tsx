import React from 'react';
import { ErrorMessage, Field, Form, Formik, FormikTouched } from 'formik';

interface IInput {
    type: 'text' | 'password' | 'tel' | 'email' | 'time' | 'date' | 'number';
    className?: string
    name: string;
    placeholder?: string;
    error?: any;
    touch?: any;
    errMessage?: string;
    min?: string;
    max?: string;
}

const Input: React.FC<IInput> = (props) => {

    // "text-red-700 text-sm
    if (props.type === 'date') {

        let today: Date = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        const yyyy = today.getFullYear();
        const nextYyyy = today.getFullYear() + 1;

        if (dd < 10) {
            dd = Number.parseInt('0') + dd
        }
        if (mm < 10) {
            mm = Number.parseInt('0') + mm
        }

        //@ts-ignore
        today = Date.parse(yyyy + '-' + mm + '-' + dd);
        let aYearDate = Date.parse(nextYyyy + '-' + mm + '-' + dd);

        return (
            <div className={`w-full`}>
                <Field
                    type={props.type}
                    name={props.name}
                    min={props.min && today}
                    max={props.max && aYearDate}
                    placeholder={props.placeholder ?? ""}
                    className={`border-[1px] w-full border-slate-400 border-solid p-3 mb-1 text-center`}
                />
                {props.touch && props.error && <div className={"text-red-700 text-sm"}>{props.errMessage}</div>}
            </div>
        )
    } else {
        return (
            <div className={`w-full`}>
                <Field
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder ?? ""}
                    className={`border-[1px] w-full border-slate-400 border-solid p-3 mb-1 text-center`}
                />
                {props.touch && props.error && <div className={"text-red-700 text-sm"}>{props.errMessage}</div>}
            </div>
        )
    }
}

export default Input;