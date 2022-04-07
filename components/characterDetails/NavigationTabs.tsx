import { Bookmark, Event, ImportContacts, Message } from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";

interface Props
{
    selectedIndex: number;
    onSelectedIndexChanged: ( index: number ) => void;
}

const NavigationTabs = ( { selectedIndex, onSelectedIndexChanged }: Props ) =>
{
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant="fullWidth" value={selectedIndex} onChange={( event, value: number ) => onSelectedIndexChanged( value )}>
                <Tab icon={<ImportContacts />} label="Comics" />
                <Tab icon={<Message />} label="Stories" />
                <Tab icon={<Event />} label="Events" />
                <Tab icon={<Bookmark />} label="Series" />
            </Tabs>
        </Box>
    );
}

export default NavigationTabs;