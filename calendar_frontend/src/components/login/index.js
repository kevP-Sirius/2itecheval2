let Login = (props) => {
    return (
        <div className="login d-flex justify-content-center">
            <form className="login__container">
                <div className="login__container__header">
                    <h1>Log in</h1>
                </div>
                <div className="login__container__body">
                    <div className="login__container__body__form">
                        <div className="login__container__body__form__input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="login__container__body__form__input">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </div>
                        <div className="login__container__body__form__input">
                            <button type="button" className="btn btn-primary">Log in</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login