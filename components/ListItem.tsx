import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Avatar, IconButton, ListItem as MaterialListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { resetAll } from "../store/detailLists";
import { useAppDispatch } from "../store/hooks";

interface Props
{
    description: string;
    text: string;
    thumbnail?: string;
    id?: string;
}

const ListItemContentBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const ListItem = ( { text, description, thumbnail, id }: Props ) =>
{
    const [ expanded, setExpanded ] = useState( false );
    const toggleExpand = () =>
    {
        setExpanded( prev => !prev );
    }

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onClick = () =>
    {
        if ( id )
        {
            dispatch( resetAll() );
            router.push( `/character/${id}` );
        }
    }

    return (
        <>
            <MaterialListItem secondaryAction={
                <IconButton onClick={toggleExpand} edge="end">
                    {description && description !== "" ? expanded ? <ExpandLess /> : <ExpandMore /> : <></>}
                </IconButton>
            }>
                <ListItemContentBox style={{ cursor: "pointer" }} onClick={onClick}>
                    {thumbnail && <ListItemAvatar>
                        <Avatar alt={text} src={thumbnail} />
                    </ListItemAvatar>}
                    <ListItemText primary={text}></ListItemText>
                </ListItemContentBox>
            </MaterialListItem>
            {expanded &&
                <div style={{ padding: "20px" }}>
                    <span>{description}</span>
                </div>
            }
        </>
    )
}

export default ListItem;