interface Props {
    isLoading: boolean,
    isError: boolean,
}

const ApiComplementary: React.FC<Props> = ({ isLoading, isError }) => {
    return (
        <>
            {isLoading && <span>Cargando...</span>}
            {isError && <span>Ocurrió un error.</span>}
        </>
    );
}

export default ApiComplementary;