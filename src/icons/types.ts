import { SFC, SVGProps } from 'react';

export type TSVG<ExtraProps = {}> = SFC<
  SVGProps<SVGSVGElement> & { className?: string } & ExtraProps
>;
