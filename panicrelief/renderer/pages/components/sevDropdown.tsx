import { Flex, Text, Button, Grid, DropdownMenu } from '@radix-ui/themes';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface SevDropdownProps {
    onValueChange: (value: number) => void;
}

const button_style = {
    backgroundColor: 'rgba(51,122,255,0.1)',
};

const SevDropdown: React.FC<SevDropdownProps> = ({ onValueChange }) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Handle the keydown event here
            if (event.key === '1' && event.metaKey) {
                // Handle the shortcut for Sev 1
                console.log('Sev 1 shortcut triggered');
                onValueChange(1);
            } else if (event.key === '2' && event.metaKey) {
                // Handle the shortcut for Sev 2
                console.log('Sev 2 shortcut triggered');
                onValueChange(2);
            } else if (event.key === '3' && event.metaKey) {
                // Handle the shortcut for Sev 3
                // console.log('Sev 3 shortcut triggered');
                // onValueChange(3);
            }
        };
        const handleSelection = (event: any) => {
            console.log('Sev selected');
            console.log(event);
            onValueChange(event);
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

  return (
  <DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="soft" style={button_style}>
      Severity
      <CaretDownIcon />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content sideOffset={5}>
    <DropdownMenu.Item shortcut="⌘ 1" onSelect={() => onValueChange(1)}>Sev 1 (1 Hour)</DropdownMenu.Item>
    <DropdownMenu.Item shortcut="⌘ 2" onSelect={() => onValueChange(2)}>Sev 2 (1 Day)</DropdownMenu.Item>
    {/* <DropdownMenu.Item shortcut="⌘ 3" onSelect={() => onValueChange(3)}>Sev 3 (1 Week)</DropdownMenu.Item> */}
  </DropdownMenu.Content>
</DropdownMenu.Root>
  );
}

export default SevDropdown;