import { Avatar, Badge, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
    const user = useSelector((state) => state.user);

    if (!user?.token) {
        return <Navigate to="/login" replace />;
    }

    const joinedOn = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : null;
    const initials = (user.name || 'U')
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <Container size="sm" py="xl">
            <Card shadow="md" radius="lg" p="xl" withBorder>
                <Stack align="center" gap="md">
                    <Avatar src={user.avatar} size={160} radius={160} alt={user.name || 'User avatar'}>
                        {initials}
                    </Avatar>

                    <Stack gap={4} align="center">
                        <Title order={2}>{user.name || 'Unnamed user'}</Title>
                        <Text c="dimmed">{user.email || 'No email available'}</Text>
                    </Stack>

                    <Group gap="xs" justify="center">
                        <Badge variant="light" size="lg">
                            Logged in
                        </Badge>
                        {joinedOn && (
                            <Badge variant="outline" size="lg">
                                Joined {joinedOn}
                            </Badge>
                        )}
                    </Group>

                    <Button component={Link} to="/" variant="light">
                        Back to Home
                    </Button>
                </Stack>
            </Card>
        </Container>
    );
}


