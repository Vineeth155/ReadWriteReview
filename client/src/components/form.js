import './form.css'

export const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
return (
    <form className='mainForm' onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div>
            <div className="form">
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} id='username' onChange={e=>setUsername(e.target.value)} />
            </div>
            <div className="form">
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} id='password' onChange={e=>setPassword(e.target.value)} />
            </div>
        </div>
            <button className="submit" type="submit" onClick={onSubmit}>{label}</button>
    </form>
    )
}