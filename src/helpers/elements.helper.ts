import { FolderElement } from '@/api/folder-element';

export enum InternalElementType {
  Report = 'report',
  Chart = 'chart',
  ExtReport = 'extreport',
  ExtContent = 'extcontent',
}

export function getInternalType(elementType: string): InternalElementType {
  let internalType: InternalElementType;

  switch (elementType) {
    case 'metric':
    case 'multi-metric':
      internalType = InternalElementType.Chart;
      break;

    case 'external report':
      internalType = InternalElementType.ExtReport;
      break;

    case 'other external report':
      internalType = InternalElementType.ExtContent;
      break;

    case 'report':
    case 'internal report':
    default:
      internalType = InternalElementType.Report;
      break;
  }

  return internalType;
}

export function elementsToMap<TElement extends { element_id: string; segment_value_id?: string }>(
  elements: TElement[],
): Map<string, TElement> {
  return elements.reduce((acc, el) => {
    acc.set(`${el.element_id}_${el.segment_value_id || '0'}`, el);

    return acc;
  }, new Map<string, TElement>());
}

export interface ElementPreviewOpts {
  ttl?: number;
}

export function buildElementPreviewUrl(element: FolderElement, opts?: ElementPreviewOpts): string {
  const url = new URL(
    `/content/index/preview/element/${element.element_id}/segment/${element.segment_value_id}`,
    window.location.origin,
  );

  const { ttl } = opts || {};

  if (ttl) {
    url.searchParams.set('ttl', ttl.toString());
  }

  return url.toString();
}
