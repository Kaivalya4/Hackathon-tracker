const Layout = (props) => {
    return (
        <div>
            <div className="container-fluid ai-planet">
                <img src={require("../assets/AI Planet Logo.png")} alt="" />
            </div>
            {props.children}
        </div>
    );
};

export default Layout;
