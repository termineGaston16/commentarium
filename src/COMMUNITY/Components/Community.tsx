import GroupChat from './GroupChat'
import './Styles/community.css'
import UserChat from '../../USER/Components/UserChat'

export default function Community() {
    return (<main className="community">
        <GroupChat />
        <UserChat />
    </main>)
}