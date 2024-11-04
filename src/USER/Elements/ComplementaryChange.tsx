import { GiPlantsAndAnimals } from "react-icons/gi";
import { CiLocationArrow1 } from "react-icons/ci";
import { BsGenderMale } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";
import { ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { Prop } from "../Components/Register";
import { APIresponse, Gender, Location, MagicClass, Specie } from "../../COMMUNITY/Type.d/Interfaces";
import { getGenderFirebase, getLocationsFirebase, getMagicClassFirebase, getSpeciesFirebase } from "../../FIREBASE";

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

    const [SPECIES, setSPECIES] = useState<APIresponse>({
        data: {
            isError: false,
            result: null
        },
        isLoading: true
    })
    const [LOCATIONS, setLOCATIONS] = useState<APIresponse>({
        data: {
            isError: false,
            result: null
        },
        isLoading: true
    })
    const [GENDER, setGENDER] = useState<APIresponse>({
        data: {
            isError: false,
            result: null
        },
        isLoading: true
    })
    const [MAGIC_CLASSES, setMAGIC_CLASSES] = useState<APIresponse>({
        data: {
            isError: false,
            result: null
        },
        isLoading: true
    })

    useEffect(() => {
        const fetchComments = async () => {
            const genderDATA = await getGenderFirebase();
            const locationsDATA = await getLocationsFirebase();
            const magicClassDATA = await getMagicClassFirebase();
            const speciesDATA = await getSpeciesFirebase();

            setGENDER({
                data: genderDATA,
                isLoading: false
            })

            setLOCATIONS({
                data: locationsDATA,
                isLoading: false
            })

            setMAGIC_CLASSES({
                data: magicClassDATA,
                isLoading: false
            })

            setSPECIES({
                data: speciesDATA,
                isLoading: false
            })
        };

        fetchComments();
    }, []);

    const showComplementary = (value: number): ReactNode | null => {
        switch (value) {
            case 1:
                return (
                    <>
                        {SPECIES.isLoading ? <span>Cargando Especies...</span> :
                            <ul>
                                {(SPECIES.data.result as Specie[]).map((specie, index) => (
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
                            </ul>}
                    </>
                );
            case 2:
                return LOCATIONS.isLoading ? <span>Cargando Localidades...</span> : (
                    <ul>
                        {(LOCATIONS.data.result as Location[]).map((location, index) => (
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
                return GENDER.isLoading ? <span>Cargando Géneros...</span> : (
                    <ul>
                        {(GENDER.data.result as Gender[]).map((gender, index) => (
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
                return MAGIC_CLASSES.isLoading ? <span>Cargando Clases Mágicas...</span> : (
                    <ul>
                        {(MAGIC_CLASSES.data.result as MagicClass[]).map((magicClass, index) => (
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