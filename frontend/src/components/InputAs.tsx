import React, { ReactNode } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikTouched } from 'formik';

interface IInputAs {
    as: 'textarea' | 'select';
    className?: string
    name: string;
    placeholder?: string;
    error?: any;
    touch?: any;
    errMessage?: string;
    children?: ReactNode;
}

const InputAs: React.FC<IInputAs> = (props) => {

    // "text-red-700 text-sm
    if (props.as === 'textarea') {
        return (
            <div className={`w-full`}>
                <Field
                    as={props.as}
                    name={props.name}
                    placeholder={props.placeholder ?? ""}
                    className={`border-[1px] w-full border-slate-400 border-solid p-3 mb-1 text-center`}
                />
                {props.touch && props.error && <div className={"text-red-700 text-sm"}>{props.errMessage}</div>}
            </div>
        );
    } else if (props.as === 'select') {
        return (
            <div className={`w-full`}>
                <Field
                    // defaultValue={-1}
                    as={props.as}
                    name={props.name}
                    placeholder={props.placeholder ?? ""}
                    className={`border-[1px] w-full border-slate-400 border-solid p-3 mb-1 text-center`}
                >
                    {props.children}
                </Field>
                {props.touch && props.error && <div className={"text-red-700 text-sm"}>{props.errMessage}</div>}
            </div>
        )
    } else {
        return (<></>);
    }
}

export default InputAs;