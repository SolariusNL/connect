import Background from "@/assets/background.png";
import MinimalFooter from "@/components/minimal-footer";
import { Container, Paper, Text, Title } from "@mantine/core";
import { FC, ReactNode } from "react";

type OuterUIProps = {
  description: ReactNode;
  children: ReactNode;
  title?: string;
};

const OuterUI: FC<OuterUIProps> = (props) => {
  return (
    <>
      <span className="fixed inset-0 bg-background" />
      <span
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${Background.src})`,
        }}
        className="fixed inset-0"
      />
      <div className="relative">
        <Container size={420} my={40}>
          <Title className="text-center">
            {props.title ? props.title : "Solarius Connect"}
          </Title>
          <Text c="dimmed" size="sm" className="text-center" mt={5}>
            {props.description}
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md" mb={30}>
            {props.children}
          </Paper>

          <MinimalFooter />
        </Container>
      </div>
    </>
  );
};

export default OuterUI;
