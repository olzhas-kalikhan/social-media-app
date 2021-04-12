import React from 'react'

const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
})

const TabPanel = (props) => {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...a11yProps(index)}
            {...other}
        >
            {value === index && 
                children
            }
        </div >
    )
}
export { a11yProps, TabPanel }