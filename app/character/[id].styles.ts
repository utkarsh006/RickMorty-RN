import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  muted: {
    marginTop: 8,
    color: 'gray',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: '#1f2937',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  headerArea: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  meta: {
    color: 'gray',
    marginTop: 4,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  metaLabel: {
    color: '#6b7280',
    marginRight: 6,
  },
  metaValue: {
    color: '#111827',
    fontWeight: '500',
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  separator: {
    height: 12,
  },
}); 