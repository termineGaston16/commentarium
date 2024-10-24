import { useState } from "react";
import { Survey_ChatOwnUser } from "../../Type.d/Interfaces";
import { useAppDispatch } from "../../../REDUX/Hook/useStore";

interface Props {
    index: number;
    value: Survey_ChatOwnUser['value'];
}

const SurveyInput: React.FC<Props> = ({ value, index }) => {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState<string>(value.title);
    const [options, setOptions] = useState<string[]>(value.options);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        dispatch({
            type: 'temporaryChatOwnUserSlice/modifyValueInput',
            payload: {
                index,
                newValue: { title: newTitle, options }
            }
        });
    };

    const onChangeOption = (e: React.ChangeEvent<HTMLInputElement>, optionIndex: number) => {
        const newOptions = options.map((option, idx) =>
            idx === optionIndex ? e.target.value : option
        );
        setOptions(newOptions);


        dispatch({
            type: 'temporaryChatOwnUserSlice/modifyValueInput',
            payload: {
                index,
                newValue: { title, options: newOptions } 
            }
        });
    };

    const addOption = () => {
        const newOptions = [...options, ''];
        setOptions(newOptions);

        dispatch({
            type: 'temporaryChatOwnUserSlice/modifyValueInput',
            payload: {
                index,
                newValue: { title, options: newOptions }
            }
        });
    };

    return (
        <li className="user-chat__item">
            <div>
                <button
                    type="button"
                    onClick={() => {
                        dispatch({
                            type: 'temporaryChatOwnUserSlice/removedInputChat',
                            payload: index
                        });
                    }}
                >
                    X
                </button>
                <h4>Crea una encuesta</h4>

                {/* Campo para el título */}
                <input
                    onChange={onChangeTitle}
                    name="titleSurveyInput"
                    type="text"
                    value={title}
                    placeholder="Título de la encuesta"
                />

                <h4>Opciones</h4>
                {options.map((option, optionIndex) => (
                    <input
                        key={optionIndex}
                        onChange={(e) => onChangeOption(e, optionIndex)}
                        value={option}
                        type="text"
                        placeholder={`*Opción ${optionIndex + 1}`}
                    />
                ))}
                <button onClick={addOption}>Agregar Opción</button>
            </div>
        </li>
    );
};

export default SurveyInput;
