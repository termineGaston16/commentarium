import GroupChat from './GroupChat'
import './Styles/community.css'
import UserChat from './UserChat'

export default function Community() {
    return (<main className="community">
        <GroupChat />
        <UserChat />
    </main>)
}