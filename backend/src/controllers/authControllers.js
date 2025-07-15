const signUp = async (req , res) => {
    res.send("SignUp post route")
}

const login = async (req , res) => {
    res.send("Login route")
}

const logout = async (req , res) => {
    res.send("Logout route")
}

export {login , logout , signUp}