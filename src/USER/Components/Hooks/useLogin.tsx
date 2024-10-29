export const useLogin = () => {

    //HANDLE SUBMIT
    const handleSubmitLogin = (event: React.FormEvent<HTMLElement>, 
        validateDisplayName: (displayName: string) => string | null, 
        validateLoginUser: (displayName: string, password: string) => void, 
        validatePassworld: (password: string) => string | null,
        setAlertMessageOne: React.Dispatch<React.SetStateAction<string | null>>,
        setAlertMessageTwo: React.Dispatch<React.SetStateAction<string | null>>
    ): void => {

        event.preventDefault()

        const name = new window.FormData(event.currentTarget as HTMLFormElement).get('displayName')
        const password = new window.FormData(event.currentTarget as HTMLFormElement).get('password')

        const valorOne = validateDisplayName(name as string);
        const valorTwo = validatePassworld(password as string)

        setAlertMessageOne(valorOne)
        setAlertMessageTwo(valorTwo)

        if (!valorOne && !valorTwo) validateLoginUser(name as string, password as string)
    }

    return { handleSubmitLogin }
}