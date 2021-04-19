import React, { useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Button, Menu, MenuItem } from '@material-ui/core'
const DropdownMenu = ({ items }) => {
    const [menuElAnchor, setMenuElAnchor] = useState(null);
    const handleMenuClick = (event) => {
        setMenuElAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setMenuElAnchor(null);
    };
    return (
        <>
            <Button
                onClick={handleMenuClick}
                style={{ padding: '0 5px', minWidth: '20px' }}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                keepMounted
                anchorEl={menuElAnchor}
                open={Boolean(menuElAnchor)}
                onClose={handleClose}
            >

                {items.map((item, i) =>
                    <MenuItem key={i} onClick={item.action}>{item.title}</MenuItem>
                )}
            </Menu>
        </>
    )
}

export default DropdownMenu