const Products = require('../model/Products')

const size_filter_options = async (category,sub_category,product_type) => {

    let all_size = []
    switch(category){
        case 'Men':
        case 'Women':
            switch(sub_category){
                    case 'Clothes':
                        all_size = [
                            {
                                size_name : 'S',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['s']}})).length
                            },
                            {
                                size_name : 'M',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['m']}})).length
                            },
                            {
                                size_name : 'L',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['l']}})).length
                            },
                            {
                                size_name : 'XL',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['xl']}})).length
                            },
                            {
                                size_name : 'XXL',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['xxl']}})).length
                            },
                            {
                                size_name : 'XXS',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['xxs']}})).length
                            }
                    ]
                    break;
                    case 'Shoes' :
                        all_size =  [
                            {
                                size_name : '6',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['6']}})).length
                            },
                            {
                                size_name : '7',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['7']}})).length
                            },
                            {
                                size_name : '8',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['8']}})).length
                            },
                            {
                                size_name : '9',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['9']}})).length
                            },
                            {
                                size_name : '10',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['10']}})).length
                            },
                            {
                                size_name : '11',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['11']}})).length
                            },
                            {
                                size_name : '12',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['12']}})).length
                            }
                    ]
                    break ;
                    case 'Accesories' :
                        all_size = [
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category,sub_category,product_type})).length
                            },
                    ]
                    break ;
                }
        break;
        case 'Baby':
            switch(sub_category){
                    case 'Clothes':
                        all_size = [
                            {
                                size_name : '12-18M',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['12-18m']}})).length
                            },
                            {
                                size_name : '18-24M',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['18-24m']}})).length
                            },
                            {
                                size_name : '2-3Y',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['2-3y']}})).length
                            },
                            {
                                size_name : '3-4Y',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['3-4y']}})).length
                            },
                            {
                                size_name : '4-5Y',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['4-5y']}})).length
                            }
                    ]
                    case 'Shoes' :
                            retrun [
                            {
                                size_name : '12/13',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['12/13']}})).length
                            },
                            {
                                size_name : '14/15',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['14/15']}})).length
                            },
                            {
                                size_name : '16/17',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['16/17']}})).length
                            },
                            {
                                size_name : '20/21',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['20/21']}})).length
                            },
                            {
                                size_name : '22',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['22']}})).length
                            },
                            {
                                size_name : '23',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['23']}})).length
                            },
                            {
                                size_name : '24',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['24']}})).length
                            },
                            {
                                size_name : '25',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['25']}})).length
                            }
                    ]
                    break ;
                    case 'Accesories' :
                        all_size = [
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category,sub_category,product_type})).length
                            },
                    ]
                    break ;
                }
        break;
        case 'Kids':
            switch(sub_category){
                    case 'Clothes':
                        all_size = [
                            {
                                size_name : '6-7Y',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['6-7y']}})).length
                            },
                            {
                                size_name : '8-9Y',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['8-9y']}})).length
                            },
                            {
                                size_name : '9-10Y',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['9-10y']}})).length
                            },
                            {
                                size_name : '11-12Y',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['11-12y']}})).length
                            },
                            {
                                size_name : '13-14Y',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['13-14y']}})).length
                            }
                    ]
                    break;
                    case 'Shoes' :
                        all_size = [
                            {
                                size_name : '26',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['26']}})).length
                            },
                            {
                                size_name : '27',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['27']}})).length
                            },
                            {
                                size_name : '28',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['28']}})).length
                            },
                            {
                                size_name : '29',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['29']}})).length
                            },
                            {
                                size_name : '30',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['30']}})).length
                            },
                            {
                                size_name : '31',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['31']}})).length
                            },
                            {
                                size_name : '32',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['32']}})).length
                            },
                            {
                                size_name : '33',
                                total_products : (await Products.find({category,sub_category,product_type,product_size : { $in : ['33']}})).length
                            }
                    ]
                    break ;
                    case 'Accesories' :
                        all_size = [
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category,sub_category,product_type})).length
                            },
                    ]
                    break ;
                }
        break;
        case 'Beauty':
            all_size = [
                {
                    size_name : 'NO SIZE',
                    total_products : (await Products.find({category,sub_category,product_type})).length
                }]
        break;
        case 'Home':
            all_size = [
                {
                    size_name : 'NO SIZE',
                    total_products : (await Products.find({category,sub_category,product_type})).length
                }]
        break;
            
    }

    return all_size
}

const color_filter_options = async (products) => {
    let all_colors = []

    const getTotalColor = (color) => {
        const colorFound = products.filter(product => {
            if(product.color.name === color){
                return product
            }
        })

        return colorFound.length
    }

    products.map((product) => {
        if(all_colors.length == 0){
            all_colors.push({
                    name : product.color.name,
                    hex : product.color.hex,
                    total : getTotalColor(product.color.name)
            })
        }else{
            let colorFound = all_colors.filter((color) => {
                if(color.name == product.color.name){
                    return product
                }
            })

            if(colorFound.length === 0){
                all_colors.push({
                    name : product.color.name,
                    hex : product.color.hex,
                    total : getTotalColor(product.color.name)
                })
            }
        }
    })
    return all_colors
}

const products_type_filter_options = async (category,sub_category) => {
    let all_product_type = []

    const products = await Products.find({category,sub_category})

    const getTotalProduct_type = (product_type) => {
        const prdFound = products.filter(product => {
            if(product.product_type === product_type){
                return product
            }
        })

        return prdFound.length
    }

    products.map((product) => {
        if(all_product_type.length === 0){
            all_product_type.push({
                product_type_name : product.product_type,
                product_type_total : getTotalProduct_type(product.product_type)
            })
        }else{
            let prdFound = all_product_type.filter((prd) => {
                if(prd.product_type_name == product.product_type){
                    return product
                }
            })

            if(prdFound.length === 0){
                all_product_type.push({
                    product_type_name : product.product_type,
                    product_type_total : getTotalProduct_type(product.product_type)
                })
            }
        }
    })

    return all_product_type
}


const products_type_filter_options_2 = async (category) => {
    let all_product_type = []

    const products = await Products.find({category})

    const getTotalProduct_type = (product_type) => {
        const prdFound = products.filter(product => {
            if(product.product_type === product_type){
                return product
            }
        })

        return prdFound.length
    }

    products.map((product) => {
        if(all_product_type.length === 0){
            all_product_type.push({
                product_type_name : product.product_type,
                product_type_total : getTotalProduct_type(product.product_type)
            })
        }else{
            let prdFound = all_product_type.filter((prd) => {
                if(prd.product_type_name == product.product_type){
                    return product
                }
            })

            if(prdFound.length === 0){
                all_product_type.push({
                    product_type_name : product.product_type,
                    product_type_total : getTotalProduct_type(product.product_type)
                })
            }
        }
    })

    return all_product_type
}

const size_filter_options_2 = async (category,sub_category,product_type_1,product_type_2) => {
    let all_size = []
    switch(category){
        case 'Men':
        case 'Women':
            switch(sub_category){
                    case 'Clothes':
                        all_size = [
                            {
                                size_name : 'S',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['s']}})).length
                            },
                            {
                                size_name : 'M',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['m']}})).length
                            },
                            {
                                size_name : 'L',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['l']}})).length
                            },
                            {
                                size_name : 'XL',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['xl']}})).length
                            },
                            {
                                size_name : 'XXL',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['xxl']}})).length
                            },
                            {
                                size_name : 'XXS',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['xxs']}})).length
                            }
                    ]
                    break;
                    case 'Shoes' :
                        all_size =  [
                            {
                                size_name : '6',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['6']}})).length
                            },
                            {
                                size_name : '7',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['7']}})).length
                            },
                            {
                                size_name : '8',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['8']}})).length
                            },
                            {
                                size_name : '9',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['9']}})).length
                            },
                            {
                                size_name : '10',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['10']}})).length
                            },
                            {
                                size_name : '11',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['11']}})).length
                            },
                            {
                                size_name : '12',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['12']}})).length
                            }
                    ]
                    break ;
                    case 'Accesories' :
                        all_size = [
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]}})).length
                            },
                    ]
                    break ;
                }
        break;
        case 'Baby':
            switch(sub_category){
                    case 'Clothes':
                        all_size = [
                            {
                                size_name : '12-18M',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['12-18m']}})).length
                            },
                            {
                                size_name : '18-24M',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['18-24m']}})).length
                            },
                            {
                                size_name : '2-3Y',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['2-3y']}})).length
                            },
                            {
                                size_name : '3-4Y',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['3-4y']}})).length
                            },
                            {
                                size_name : '4-5Y',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['4-5y']}})).length
                            }
                    ]
                    case 'Shoes' :
                            retrun [
                            {
                                size_name : '12/13',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['12/13']}})).length
                            },
                            {
                                size_name : '14/15',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['14/15']}})).length
                            },
                            {
                                size_name : '16/17',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['16/17']}})).length
                            },
                            {
                                size_name : '20/21',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['20/21']}})).length
                            },
                            {
                                size_name : '22',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['22']}})).length
                            },
                            {
                                size_name : '23',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['23']}})).length
                            },
                            {
                                size_name : '24',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['24']}})).length
                            },
                            {
                                size_name : '25',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['25']}})).length
                            }
                    ]
                    break ;
                    case 'Accesories' :
                        all_size = [
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]}})).length
                            },
                    ]
                    break ;
                }
        break;
        case 'Kids':
            switch(sub_category){
                    case 'Clothes':
                        all_size = [
                            {
                                size_name : '6-7Y',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['6-7y']}})).length
                            },
                            {
                                size_name : '8-9Y',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['8-9y']}})).length
                            },
                            {
                                size_name : '9-10Y',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['9-10y']}})).length
                            },
                            {
                                size_name : '11-12Y',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['11-12y']}})).length
                            },
                            {
                                size_name : '13-14Y',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['13-14y']}})).length
                            }
                    ]
                    break;
                    case 'Shoes' :
                        all_size = [
                            {
                                size_name : '26',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['26']}})).length
                            },
                            {
                                size_name : '27',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['27']}})).length
                            },
                            {
                                size_name : '28',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['28']}})).length
                            },
                            {
                                size_name : '29',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['29']}})).length
                            },
                            {
                                size_name : '30',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['30']}})).length
                            },
                            {
                                size_name : '31',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['31']}})).length
                            },
                            {
                                size_name : '32',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['32']}})).length
                            },
                            {
                                size_name : '33',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]},product_size : { $in : ['33']}})).length
                            }
                    ]
                    break ;
                    case 'Accesories' :
                        all_size = [
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]}})).length
                            },
                    ]
                    break ;
                }
        break;
        case 'Beauty':
            all_size = [
                {
                    size_name : 'NO SIZE',
                    total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]}})).length
                }]
        break;
        case 'Home':
            all_size = [
                {
                    size_name : 'NO SIZE',
                    total_products : (await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]}})).length
                }]
        break;
            
    }

    return all_size
}


const size_filter_options_3 = async (category) => {
    let all_size = []
    switch(category){
        case 'Men':
        case 'Women':
                        all_size = [
                            {
                                size_name : 'S',
                                total_products : (await Products.find({category,product_size : { $in : ['s']}})).length
                            },
                            {
                                size_name : 'M',
                                total_products : (await Products.find({category,product_size : { $in : ['m']}})).length
                            },
                            {
                                size_name : 'L',
                                total_products : (await Products.find({category,product_size : { $in : ['l']}})).length
                            },
                            {
                                size_name : 'XL',
                                total_products : (await Products.find({category,product_size : { $in : ['xl']}})).length
                            },
                            {
                                size_name : 'XXL',
                                total_products : (await Products.find({category,product_size : { $in : ['xxl']}})).length
                            },
                            {
                                size_name : 'XXS',
                                total_products : (await Products.find({category,product_size : { $in : ['xxs']}})).length
                            },
                            {
                                size_name : '6',
                                total_products : (await Products.find({category,product_size : { $in : ['6']}})).length
                            },
                            {
                                size_name : '7',
                                total_products : (await Products.find({category,product_size : { $in : ['7']}})).length
                            },
                            {
                                size_name : '8',
                                total_products : (await Products.find({category,product_size : { $in : ['8']}})).length
                            },
                            {
                                size_name : '9',
                                total_products : (await Products.find({category,product_size : { $in : ['9']}})).length
                            },
                            {
                                size_name : '10',
                                total_products : (await Products.find({category,product_size : { $in : ['10']}})).length
                            },
                            {
                                size_name : '11',
                                total_products : (await Products.find({category,product_size : { $in : ['11']}})).length
                            },
                            {
                                size_name : '12',
                                total_products : (await Products.find({category,product_size : { $in : ['12']}})).length
                            },
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category})).length
                            },
                            {
                                size_name : '12-18M',
                                total_products : (await Products.find({category,product_size : { $in : ['12-18m']}})).length
                            },
                            {
                                size_name : '18-24M',
                                total_products : (await Products.find({category,product_size : { $in : ['18-24m']}})).length
                            },
                            {
                                size_name : '2-3Y',
                                total_products : (await Products.find({category,product_size : { $in : ['2-3y']}})).length
                            },
                            {
                                size_name : '3-4Y',
                                total_products : (await Products.find({category,product_size : { $in : ['3-4y']}})).length
                            },
                            {
                                size_name : '4-5Y',
                                total_products : (await Products.find({category,product_size : { $in : ['4-5y']}})).length
                            },
                            {
                                size_name : '12/13',
                                total_products : (await Products.find({category,product_size : { $in : ['12/13']}})).length
                            },
                            {
                                size_name : '14/15',
                                total_products : (await Products.find({category,product_size : { $in : ['14/15']}})).length
                            },
                            {
                                size_name : '16/17',
                                total_products : (await Products.find({category,product_size : { $in : ['16/17']}})).length
                            },
                            {
                                size_name : '20/21',
                                total_products : (await Products.find({category,product_size : { $in : ['20/21']}})).length
                            },
                            {
                                size_name : '22',
                                total_products : (await Products.find({category,product_size : { $in : ['22']}})).length
                            },
                            {
                                size_name : '23',
                                total_products : (await Products.find({category,product_size : { $in : ['23']}})).length
                            },
                            {
                                size_name : '24',
                                total_products : (await Products.find({category,product_size : { $in : ['24']}})).length
                            },
                            {
                                size_name : '25',
                                total_products : (await Products.find({category,product_size : { $in : ['25']}})).length
                            },
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category})).length
                            },
                            {
                                size_name : '6-7Y',
                                total_products : (await Products.find({category,product_size : { $in : ['6-7y']}})).length
                            },
                            {
                                size_name : '8-9Y',
                                total_products : (await Products.find({category,product_size : { $in : ['8-9y']}})).length
                            },
                            {
                                size_name : '9-10Y',
                                total_products : (await Products.find({category,product_size : { $in : ['9-10y']}})).length
                            },
                            {
                                size_name : '11-12Y',
                                total_products : (await Products.find({category,product_size : { $in : ['11-12y']}})).length
                            },
                            {
                                size_name : '13-14Y',
                                total_products : (await Products.find({category,product_size : { $in : ['13-14y']}})).length
                            },
                            {
                                size_name : '26',
                                total_products : (await Products.find({category,product_size : { $in : ['26']}})).length
                            },
                            {
                                size_name : '27',
                                total_products : (await Products.find({category,product_size : { $in : ['27']}})).length
                            },
                            {
                                size_name : '28',
                                total_products : (await Products.find({category,product_size : { $in : ['28']}})).length
                            },
                            {
                                size_name : '29',
                                total_products : (await Products.find({category,product_size : { $in : ['29']}})).length
                            },
                            {
                                size_name : '30',
                                total_products : (await Products.find({category,product_size : { $in : ['30']}})).length
                            },
                            {
                                size_name : '31',
                                total_products : (await Products.find({category,product_size : { $in : ['31']}})).length
                            },
                            {
                                size_name : '32',
                                total_products : (await Products.find({category,product_size : { $in : ['32']}})).length
                            },
                            {
                                size_name : '33',
                                total_products : (await Products.find({category,product_size : { $in : ['33']}})).length
                            },
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category})).length
                            },
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category})).length
                            },
                            {
                                size_name : 'NO SIZE',
                                total_products : (await Products.find({category})).length
                            }]
        break;
            
    }

    return all_size
}


const color_filter_options_2 = async (category,sub_category,product_type_1,product_type_2) => {
    console.log(category,sub_category,product_type_1,product_type_2);
    let all_colors = []

    const products = await Products.find({category,sub_category,product_type : {$in : [product_type_1, product_type_2]}})

    const getTotalColor = (color) => {
        const colorFound = products.filter(product => {
            if(product.color.name === color){
                return product
            }
        })

        return colorFound.length
    }

    products.map((product) => {
        if(all_colors.length == 0){
            all_colors.push({
                    name : product.color.name,
                    hex : product.color.hex,
                    total : getTotalColor(product.color.name)
            })
        }else{
            let colorFound = all_colors.filter((color) => {
                if(color.name == product.color.name){
                    return product
                }
            })

            if(colorFound.length === 0){
                all_colors.push({
                    name : product.color.name,
                    hex : product.color.hex,
                    total : getTotalColor(product.color.name)
                })
            }
        }
    })
    return all_colors
}



module.exports = {size_filter_options,color_filter_options,products_type_filter_options,size_filter_options_2,color_filter_options_2,products_type_filter_options_2,size_filter_options_3}