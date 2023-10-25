export const getBranchesOptions = (branches) => {

    let branchesoptions = [];

    if(branches !== null){
        branches.map(branch => {
          branchesoptions.push(
            {
                label: branch?.title,
                id: branch?.id
            }
          )
        })
    }

    console.log(branchesoptions)

    return branchesoptions
}