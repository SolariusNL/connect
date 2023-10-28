import { Anchor, Text } from "@mantine/core";
import Link from "next/link";

const MinimalFooter: React.FC = () => {
  return (
    <div className="text-center flex flex-col items-center">
      <Text size="sm" mb={5} fw={500} c="dimmed">
        Copyright © 2023 Solarius. All rights reserved.
      </Text>

      <div className="flex items-center gap-3">
        <Anchor size="sm" component={Link} href="/privacy">
          Privacy
        </Anchor>
        <Anchor size="sm" component={Link} href="/terms">
          Terms of Service
        </Anchor>
        <Anchor size="sm" component={Link} href="/guidelines">
          Guidelines
        </Anchor>
      </div>
    </div>
  );
};

export default MinimalFooter;
