const Layout = (props) => {
    return (
        <div>
            <div className="container-fluid p-3 px-5">
                <img src={require("../assets/AI Planet Logo.png")} alt="" />
            </div>
            {props.children}
        </div>
    );
};

export default Layout;
