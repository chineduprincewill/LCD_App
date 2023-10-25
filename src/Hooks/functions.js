export const checkRole = (user, role, system_admin, system_auditor, admin, auditor, setNavlinks) => {

    if(user && user.groupid === 0 && role === 'admin'){
        setNavlinks(system_admin);
    }
    else if(user && user.groupid === 0 && role === 'auditor'){
        setNavlinks(system_auditor);
    }
    else if(user && user.groupid > 0 && role === 'admin'){
        setNavlinks(admin);
    }
    else if(user && user.groupid > 0 && role === 'auditor'){
        setNavlinks(auditor);
    }
}
