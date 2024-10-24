import { ReactNode } from "react";
import { useAppSelector } from "../../REDUX/Hook/useStore";
import { ChatOwnUser } from "../Type.d/Interfaces";
import TextInput from "./Inputs/TextInput";
import SurveyInput from "./Inputs/SurveyInput";
import ImgFileInput from "./Inputs/ImgFileInput";
import DocFileInput from "./Inputs/DocFileInput";
import AudFileInput from "./Inputs/AudFileInput";

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

                        case "SURVEY":
                            return (<SurveyInput key={index} value={element.value} index={index} />);

                        case "IMG_FILE":
                            return (<ImgFileInput key={index} value={element.linkUrl} index={index} />);

                        case "DOC_FILE":
                            return (<DocFileInput key={index} value={element} index={index} />);

                        case "AUD_FILE":
                            return (<AudFileInput key={index} value={element.linkUrl} index={index} />);

                        case "USER":
                            return ('');

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
