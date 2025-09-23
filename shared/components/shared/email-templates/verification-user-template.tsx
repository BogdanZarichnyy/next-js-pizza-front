interface Props {
  code: string;
}

const BASE_URL = process.env.NEXTAUTH_URL;

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>

    <p>Код підтверждення: <b>{code}</b></p>

    <p><a href={`${BASE_URL}/api/auth/verify?code=${code}`}>Підтвердіть реєстрацію</a></p>

  </div>
);