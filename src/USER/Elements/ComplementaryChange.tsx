import { GiPlantsAndAnimals } from "react-icons/gi";
import { CiLocationArrow1 } from "react-icons/ci";
import { BsGenderMale } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { GENDER, LOCATIONS, MAGIC_CLASSES, SPECIES } from "../../dataLocal";
import { Prop } from "../Components/Register";

interface Props {
    setDataComplementy: React.Dispatch<React.SetStateAction<Prop>>
}

const ComplementaryChange: React.FC<Props> = ({ setDataComplementy }) => {

    interface Complementary {
        component: IconType,
        text: string,
        value?: string
    }

    // OPCIONES INICIALES
    const [complementaryState, setComplementaryState] = useState<Complementary[]>([
        { component: GiPlantsAndAnimals, text: 'Pertenezco a los...' },
        { component: CiLocationArrow1, text: 'Resido en...' },
        { component: BsGenderMale, text: 'Soy' },
        { component: GiMagicPalm, text: 'Lucho como...' }
    ]);

    // CONTROLAR QUÉ OPCIÓN SE DEBE MOSTRAR
    const [openComplementary, setOpenComplementary] = useState<number>(0);

    const updateComplementaryState = (index: number, selectedValue: string) => {
        setComplementaryState(prevState =>
            prevState.map((item, i) =>
                i === index ? { ...item, value: selectedValue } : item
            )
        );
    };

    const showComplementary = (value: number): ReactNode | null => {
        switch (value) {
            case 1:
                return (
                    <ul>
                        {SPECIES.map((specie, index) => (
                            <li key={index}>
                                <button type="button"
                                    onClick={() => {
                                        setDataComplementy(prevState => ({ ...prevState, speciesRegister: specie.natalName }))
                                        updateComplementaryState(0, specie.natalName);
                                    }}>
                                    {specie.nameTranslated}
                                </button>
                            </li>
                        ))}
                    </ul>
                );
            case 2:
                return (
                    <ul>
                        {LOCATIONS.map((location, index) => (
                            <li key={index}>
                                <button type="button"
                                    onClick={() => {
                                        setDataComplementy(prevState => ({ ...prevState, locationRegister: location.natalName }))
                                        updateComplementaryState(1, location.natalName);
                                    }}>
                                    {location.natalName}
                                </button>
                            </li>
                        ))}
                    </ul>
                );
            case 3:
                return (
                    <ul>
                        {GENDER.map((gender, index) => (
                            <li key={index}>
                                <button type="button"
                                    onClick={() => {
                                        setDataComplementy(prevState => ({ ...prevState, genderRegister: gender.natalName }))
                                        updateComplementaryState(2, gender.natalName);
                                    }}>
                                    {gender.natalName}
                                </button>
                            </li>
                        ))}
                    </ul>
                );
            case 4:
                return (
                    <ul>
                        {MAGIC_CLASSES.map((magicClass, index) => (
                            <li key={index}>
                                <button type="button"
                                    onClick={() => {
                                        setDataComplementy(prevState => ({ ...prevState, magicClassRegister: magicClass.natalName }))
                                        updateComplementaryState(3, magicClass.natalName);
                                    }}>
                                    {magicClass.nameTranslated}
                                </button>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <ul className="register__form__complementary-face__list">
                {complementaryState.map((c, i) => {
                    return (
                        <li key={i}>
                            <button type="button" onClick={() => setOpenComplementary(i + 1)}>
                                {!c.value && <c.component />}
                                <span>
                                    {c.value ? c.value : c.text}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            {showComplementary(openComplementary)}
        </>
    );
}

export default ComplementaryChange;