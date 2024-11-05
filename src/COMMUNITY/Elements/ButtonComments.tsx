import { useEffect, useState } from "react";
import { getCommentLength } from "../../FIREBASE";
import { FaRegComments } from "react-icons/fa";

interface Prop {
    className: string,
    idMessage: string
}

const ButtonsComments: React.FC<Prop> = ({ className, idMessage }) => {

    const [commentCount, setCommentCount] = useState<number | string>('Cargando...');

    useEffect(() => {
        async function fetchCommentCount() {
            const count = await getCommentLength(idMessage);
            setCommentCount(count);
        }
        fetchCommentCount();
    }, []);

    return (
        <button
            className={className}
            type="button">
            <FaRegComments /> <span>{commentCount}</span>
        </button>
    )
}

export default ButtonsComments;
