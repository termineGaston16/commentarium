import { ReactNode } from "react";
import { useAppSelector } from "../../REDUX/Hook/useStore";
import { ChatOwnUser } from "../../COMMUNITY/Type.d/Interfaces";
import TextInput from "../../COMMUNITY/Elements/Inputs/TextInput";
import SurveyInput from "../../COMMUNITY/Elements/Inputs/SurveyInput";
import ImgFileInput from "../../COMMUNITY/Elements/Inputs/ImgFileInput";
import DocFileInput from "../../COMMUNITY/Elements/Inputs/DocFileInput";
import AudFileInput from "../../COMMUNITY/Elements/Inputs/AudFileInput";
import UserFileInput from "../../COMMUNITY/Elements/Inputs/UserFileInput";

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
                            return (<ImgFileInput key={index} value={element.value} index={index} />);

                        case "DOC_FILE":
                            return (<DocFileInput canBeDeleted={true} key={index} value={element} index={index} />);

                        case "AUD_FILE":
                            return (<AudFileInput key={index} value={element.value} index={index} />);

                        case "USER":
                            return (<UserFileInput canBeDeleted={true} key={index} value={element.value} index={index}/>);

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
