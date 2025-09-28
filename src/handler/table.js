

export const tableFilter = (data, filteredInfo) => {
    if (Object.keys(data).length === 0){
        return [{}]
    }

    let filtered = [...data]
    Object.entries(filteredInfo).forEach(([key, val]) => {
            filtered = filtered?.filter((item) => {
                if (key === 'status' || key === 'priority'){
                    if (val === 'all'){
                        return item
                    } else{
                        return item[key] === val
                    }
                } else {
                    return Object.values(item).some(value => value?.toString().toLowerCase().includes(val?.toString().toLowerCase()))
                }
            })
    })

    return filtered
}
