const Footer = () => {
    const currentYear: number = new Date().getFullYear();
    return (
        <>
            <footer className="bg-wm-dark-gray text-white">
                <div className="container mx-auto px-4 py-6 text-center text-sm">
                    ©{currentYear} WellMeet. All Rights Reserved.
                </div>
            </footer>

        </>
    )
}
export default Footer;

