import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const useParams = () => {
    const router = useRouter()
    const [breadParams, setBreadParams] = useState({
        attribute: null,
        brand: null,
    })

    const updateParams = (key, value) => {
        const params = router.query.category.some(
            (param) => param.split('=')[0] == key
        )
            ? router.query.category.map((query) => {
                const querySplit = query.split('=')
                if (querySplit[0] == key) {
                    if (key == 'price' || key == 'quantity' || key == 'page') {
                        return `/${[key, value].join('=')}`
                    } else {
                        const values = querySplit[1].split(',')
                        if (values.some((val) => val == value)) {
                            const updatedValue = values
                                .filter((val) => val != value)
                                .join(',')
                            if (updatedValue) {
                                return `/${[key, updatedValue].join('=')}`
                            } else {
                                return ''
                            }
                        }
                        const updatedValue = querySplit[1] + ',' + value
                        return `/${[key, updatedValue].join('=')}`
                    }
                } else {
                    return `/${query}`
                }
            })
            : [
                ...router.query.category.map((query) => `/${query}`),
                `/${[key, value].join('=')}`,
            ]

        const orderedParams = params.map((param) => {
            if (!param.includes('=')) {
                return {
                    order: 0,
                    param,
                }
            } else if (param.split('=')[0] == '/brand') {
                return {
                    order: 1,
                    param,
                }
            } else if (param.split('=')[0] == '/price') {
                return {
                    order: 2,
                    param,
                }
            } else if (param.split('=')[0] == '/quantity') {
                return {
                    order: 4,
                    param,
                }
            } else if (param.split('=')[0] == '/page') {
                return {
                    order: 5,
                    param,
                }
            } else {
                return {
                    order: 3,
                    param,
                }
            }
        })

        const paramsURL = orderedParams
            .sort((prevParam, nextParam) => prevParam.order - nextParam.order)
            .map((param) => param.param)
            .join('')

        router.push(`/categories${paramsURL}`, undefined, { shallow: true })

        return params
    }

    const checkParams = (key, value) => {
        return router.query.category.some((query) => {
            const querySplit = query.split('=')
            if (
                querySplit[0] == key &&
                querySplit[1].split(',').some((val) => val == value)
            ) {
                return true
            } else {
                return false
            }
        })
    }

    const findParams = (key) => {
        return router.query.category.find((query) => query.split('=')[0] == key)
    }

    const getParams = (extractedKeys) => {
        return router.query.category.filter(
            (query) => !extractedKeys.some((key) => key == query.split('=')[0])
        )
    }

    useEffect(() => {
        const attributeParams = router.query.category
            ? router.query.category.filter(
                (query) => query.split('-')[0] == 'attribute'
            )
            : null

        if (
            attributeParams &&
            attributeParams.length == 1 &&
            attributeParams[0].split('=')[1].split(',').length == 1
        ) {
            const attributeKeys = attributeParams[0].split('=')[0].split('-')
            const attributeValues = attributeParams[0].split('=')[1].split('-')[0]

            setBreadParams((prevParams) => ({
                ...prevParams,
                attribute: {
                    key: attributeKeys[attributeKeys.length - 1],
                    value: attributeValues,
                },
            }))
        } else {
            setBreadParams((prevParams) => ({ ...prevParams, attribute: null }))
        }

        const brandParams = router.query.category
            ? router.query.category.filter((query) => query.split('=')[0] == 'brand')
            : null

        if (
            brandParams &&
            brandParams.length == 1 &&
            brandParams[0].split('=')[1].split(',').length == 1
        ) {
            setBreadParams((prevParams) => ({
                ...prevParams,
                brand: {
                    key: 'brand',
                    value: brandParams[0].split('=')[1].split('-')[0],
                },
            }))
        } else {
            setBreadParams((prevParams) => ({ ...prevParams, brand: null }))
        }
    }, [router.query.category])

    const setQuery = ({ key, value }) => {
        router.push({ query: { ...router.query, [`${key}`]: value } }, undefined, {
            shallow: true,
        })
    }

    const setMultipleQuery = (array) => {
        const queryObject = {}

        array.forEach((query) => {
            queryObject[query.key] = query.value
        })

        router.push(
            {
                query: {
                    ...router.query,
                    ...queryObject,
                },
            },
            undefined,
            {
                shallow: true,
            }
        )
    }

    return {
        updateParams,
        checkParams,
        findParams,
        getParams,
        breadParams,
        setQuery,
        setMultipleQuery,
    }
}