// #### mask user id ####
export const maskMongoId = id => {
    return id.replace(/^(.{3}).{3}(.{5}).{10}(.{3})$/, '$1***$2***$3')
}
