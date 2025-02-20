import '../views/sidebar.css'

export default function Sidebar() {
    return(
        <div className='sidebar'>
            <div className='sidebar_manu'>
                <ul>
                    <li><a href='#'>Add expance</a></li>
                    <li><a href="#">Bank accounts</a></li>
                </ul>
            </div>
        </div>
    );
}