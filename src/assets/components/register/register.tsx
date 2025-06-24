export default function  register() {
return (
    <div className="flex flex-col items-center justify-center p-4 h-screen">

            <img
                src="public/register2.svg"
                alt="Login Image"
                className=""
            />

        <fieldset className="fieldset w-xs  bg-base-100 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">crée un compte</legend>

            <label className="fieldset-label">Email</label>


            <input type="email" className="input input-lg" placeholder="Email" />
            <label className="fieldset-label">pseudo</label>
            <input type="text" className="input input-lg" placeholder="Email" />

            <label className="fieldset-label">mot de passe</label>
            <input type="password" className="input input-lg" placeholder="Password" />
            <label className="fieldset-label"> confirmez mot de passe </label>
            <input type="password" className="input input-lg" placeholder="Password" />

            <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>

    </div>
);
}