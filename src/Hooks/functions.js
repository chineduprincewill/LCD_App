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


export const formatPosition = (position) => {
    if(position === "1" || position.charAt(position.length - 1) === "1"){
        return 'st'
    }
    else if(position === "2" || position.charAt(position.length - 1) === "2"){
        return 'nd'
    }
    else if(position === "3" || position.charAt(position.length - 1) === "3"){
        return 'rd'
    }
    else{
        return 'th'
    }
}
