// withBaseMethod.tsx
import { usePathname, useRouter } from 'next/navigation';
import { useHasMounted } from './hasMount';
import useQueryConfig from './useSearchParam';
import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;
import { sendRequest } from './sendRequest';
import { AppContext } from '@/contexts/store';
import queryString from 'query-string';
export type WithBaseMethodProps = {
  queryConfig: ISearchParams;
  mount: boolean;
  router: ReturnType<typeof useRouter>;
  pathname: ReturnType<typeof usePathname>;
  session: ReturnType<typeof useSession>;
  screens: ReturnType<typeof useBreakpoint>;
  contexts: AppContextInterface;
  sendRequest: <T>(props: IRequest) => Promise<T>;
  queryString: typeof queryString;
  [key: string]: any

};

const withBaseMethod = <P extends WithBaseMethodProps>(Component: React.ComponentType<P>) => (props: Partial<WithBaseMethodProps>) => {
  const queryConfig = useQueryConfig();
  const mount = useHasMounted();
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const screens = useBreakpoint();
  const contexts = useContext(AppContext);

  return (
    <Component
      {...(props as P)}
      queryConfig={queryConfig}
      mount={mount}
      router={router}
      pathname={pathname}
      session={session}
      screens={screens}
      contexts={contexts}
      sendRequest={sendRequest}
      queryString={queryString}
    />
  );
};

export default withBaseMethod;
