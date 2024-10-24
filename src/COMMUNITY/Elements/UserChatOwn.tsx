import { ReactNode } from "react";
import { useAppSelector } from "../../REDUX/Hook/useStore";
import { ChatOwnUser } from "../Type.d/Interfaces";
import TextInput from "./TextInput";
import SurveyInput from "./SurveyInput";

export default function userChatOwn() {

    const temporaryChatOwnUser = useAppSelector(state => state.temporaryChatOwnUser);

    // MOSTRAR INPUTS
    const showInputs = (temporaryChatOwnUser: ChatOwnUser[]): ReactNode => {

        return (
            <>
                {temporaryChatOwnUser.map((element, index) => {
                    switch (element.type) {
                        case 'TEXT':
                            return (<TextInput key={index} value={element.value} index={index} />);

                        case "FILE":
                            return (
                                <li key={index} className="user-chat__item">
                                    User...
                                </li>
                            );

                        case "SURVEY":
                            return (<SurveyInput key={index} value={element.value} index={index} />);

                        case "USER":
                            return (
                                <li key={index} className="user-chat__item">
                                    User...
                                </li>
                            );

                        default:
                            return null;
                    }
                })}
            </>
        );
    }

    return (
        <ul className="user-chat__list">
            {showInputs(temporaryChatOwnUser)}
        </ul>
    );
}
