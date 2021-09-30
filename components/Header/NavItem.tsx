import Icon from '@chakra-ui/icon';
import { Flex, FlexProps } from '@chakra-ui/layout';
import { ReactText } from 'react';
import { IconType } from 'react-icons/lib';
import Link from 'next/link'

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="/resetpassword">
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
        fontSize="xs"
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="14"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
