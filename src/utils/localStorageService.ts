class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  /**
   * Set Item in Storage
   * @param key - storage key
   * @param value - value to store (can be any JSON-serializable type)
   */
  public setItem<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get Item from Storage
   * @param key - storage key
   */
  public getItem<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }
}

const localStorage = new LocalStorageService();
export default localStorage;
