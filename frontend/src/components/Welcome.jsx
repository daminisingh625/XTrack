import "../views/welcome.css"
export default function Welcome(){
    return (
        <>
            <div className="welcome-container">
                <div className="welcome-heading">
                    <h1>Welcome to XTrack </h1>
                </div>
                <div className="welcome-text">
                <p>Ever wondered where all your money mysteriously disappears by the end of the month? 🧐 Well, say hello to 
                XTrack – your ultimate money sidekick! </p>
                </div>
                <button>Plan your budget</button>
            </div>
        </>

    )
}